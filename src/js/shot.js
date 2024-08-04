document.getElementById('backupButton').addEventListener('click', async () => {
    const input = document.getElementById('fileInput');
    const files = input.files;

    if (files.length === 0) {
        alert('Please select a folder.');
        return;
    }

    const tar = new Tar();
    for (const file of files) {
        const content = await file.arrayBuffer();
        tar.append(file.webkitRelativePath, new Uint8Array(content));
    }

    const tarBuffer = tar.out;
    const compressed = LZMA.compress(tarBuffer);

    const blob = new Blob([new Uint8Array(compressed)], { type: 'application/x-xz' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'backup.tar.xz';
    downloadLink.style.display = 'block';
    downloadLink.innerText = 'Download Backup';
});
