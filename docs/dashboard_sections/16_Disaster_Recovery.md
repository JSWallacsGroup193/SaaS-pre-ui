## Disaster Recovery & Data Protection

### Backup Strategy

**Priority**: Must Have

**Database Schema**:
```sql
CREATE TABLE backup_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_type VARCHAR(20),  -- 'full', 'incremental', 'differential'
  status VARCHAR(20),  -- 'in_progress', 'completed', 'failed'
  file_size_bytes BIGINT,
  file_path TEXT,
  storage_location VARCHAR(100),  -- 's3', 'azure_blob', 'local'
  retention_until DATE,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  error_message TEXT
);

CREATE TABLE restore_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_id UUID REFERENCES backup_jobs(id),
  checkpoint_name VARCHAR(100),
  description TEXT,
  database_size_bytes BIGINT,
  can_restore_to BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Backup Service**:
```typescript
@Injectable()
export class BackupService {
  @Cron('0 2 * * *')  // Daily at 2 AM
  async performFullBackup() {
    const backup = await this.prisma.backupJob.create({
      data: {
        backupType: 'full',
        status: 'in_progress',
        startedAt: new Date()
      }
    });
    
    try {
      // Create database dump
      const dumpFile = await this.createDatabaseDump();
      
      // Encrypt backup
      const encryptedFile = await this.encryptBackup(dumpFile);
      
      // Upload to S3 with lifecycle policy
      const s3Key = `backups/${format(new Date(), 'yyyy-MM-dd')}/full-backup.sql.gz.enc`;
      await this.s3.upload({
        Bucket: process.env.BACKUP_BUCKET,
        Key: s3Key,
        Body: fs.createReadStream(encryptedFile),
        ServerSideEncryption: 'AES256',
        StorageClass: 'GLACIER_IR',  // Instant Retrieval for compliance
        Tagging: `RetentionYears=7&Type=DatabaseBackup`
      });
      
      const fileSize = (await fs.stat(encryptedFile)).size;
      
      await this.prisma.backupJob.update({
        where: { id: backup.id },
        data: {
          status: 'completed',
          filePath: s3Key,
          fileSizeBytes: fileSize,
          storageLocation: 's3',
          retentionUntil: addYears(new Date(), 7),
          completedAt: new Date()
        }
      });
      
      // Clean up local files
      await fs.unlink(dumpFile);
      await fs.unlink(encryptedFile);
      
    } catch (error) {
      await this.prisma.backupJob.update({
        where: { id: backup.id },
        data: {
          status: 'failed',
          errorMessage: error.message,
          completedAt: new Date()
        }
      });
      
      throw error;
    }
  }
  
  async restoreFromBackup(backupId: string): Promise<void> {
    const backup = await this.prisma.backupJob.findUnique({
      where: { id: backupId }
    });
    
    if (!backup) {
      throw new Error('Backup not found');
    }
    
    // Download from S3
    const encryptedFile = await this.s3.download(backup.filePath);
    
    // Decrypt backup
    const dumpFile = await this.decryptBackup(encryptedFile);
    
    // Create restore point before restoration
    await this.createRestorePoint('before_restore');
    
    // Restore database
    await this.restoreDatabase(dumpFile);
    
    // Cleanup
    await fs.unlink(encryptedFile);
    await fs.unlink(dumpFile);
  }
  
  @Cron('0 */6 * * *')  // Every 6 hours
  async testBackupIntegrity() {
    const latestBackup = await this.getLatestBackup();
    
    // Download and verify backup can be decrypted
    const isValid = await this.verifyBackup(latestBackup);
    
    if (!isValid) {
      await this.alertAdmins('Backup integrity check failed!');
    }
  }
}
```

**Recovery Time Objective (RTO) / Recovery Point Objective (RPO)**:
```typescript
const DR_POLICY = {
  RPO: '1 hour',  // Maximum data loss acceptable (1 hour of transactions)
  RTO: '4 hours',  // Maximum downtime acceptable (4 hours to restore)
  
  backupSchedule: {
    full: 'daily at 2 AM',
    incremental: 'every 6 hours',
    transactionLog: 'every 15 minutes'
  },
  
  retentionPolicy: {
    daily: 30,    // Keep 30 days of daily backups
    weekly: 52,   // Keep 52 weeks of weekly backups
    monthly: 84,  // Keep 7 years of monthly backups (compliance)
    yearly: 7     // Keep 7 years of yearly backups
  }
};
```

**Benefits**:
- Protect against data loss
- Compliance with retention requirements
- Fast disaster recovery
- Point-in-time restoration

---

