import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 24 },
  header: { fontSize: 18, marginBottom: 12 },
  row: { flexDirection: 'row', borderBottom: 1, borderColor: '#ccc', paddingVertical: 4 },
  cell: { flex: 1, fontSize: 10, paddingRight: 4 }
});

export function CustomPDF({ data }) {
  const headers = data[0] ? Object.keys(data[0]) : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Custom Report</Text>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          {headers.map((key) => (
            <Text key={key} style={[styles.cell, { fontWeight: 'bold' }]}>{key}</Text>
          ))}
        </View>
        {data.map((row, idx) => (
          <View key={idx} style={styles.row}>
            {headers.map((key, i) => (
              <Text key={i} style={styles.cell}>{row[key]?.toString()}</Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}