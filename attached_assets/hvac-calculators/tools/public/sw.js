self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-uploads') {
    event.waitUntil(syncUploadQueue())
  }
})

async function syncUploadQueue() {
  // placeholder
}
