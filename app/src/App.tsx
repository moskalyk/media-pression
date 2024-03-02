import React, { useState, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import 'jimp';
import { translate } from './main'
import { Fluence, kras } from '@fluencelabs/js-client'

function App() {
  const [encodedImage, setEncodedImage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState<object>({});

  useEffect(() => {
    setTimeout(async () => {
      await Fluence.connect(kras[1])
      console.log('connected', await Fluence.getClient().getPeerId())
    }, 0)
  }, [])

  const handleFileEncode = async (file: any) => {

    const reader = new FileReader()

    reader.onload = async function(event: any) {
      const arrayBuffer = event.target.result
      const uint8Array = new Uint8Array(arrayBuffer);

      console.log(uint8Array)

      const res = await translate(kras[1].peerId, '12D3KooWQ7P4MB1MStsUDBFn6XNv8SpteBC4V5YvW1qYr4PJ1ryw', Array.from(uint8Array), {ttl: 20000} )
      const dataURL = `data:image/png;base64,${Buffer.from(res).toString('base64')}`;
      setEncodedImage(dataURL)
    }

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FileUploader label="Encode Image" handleChange={handleFileEncode} />
      </div>

      {encodedImage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img src={encodedImage} alt="Encoded Image" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <FileUploader label="Decode Image" handleChange={() => {}} />
      </div>

      {decodedMessage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3>Decoded Message:</h3>
          <pre>{JSON.stringify(decodedMessage, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;