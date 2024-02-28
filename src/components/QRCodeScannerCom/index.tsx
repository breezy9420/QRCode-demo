import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeResult } from 'html5-qrcode';
import { Html5QrcodeError } from 'html5-qrcode/esm/core';
import style from './index.less';

const QRCodeScannerCom = () => {
  const instance = useRef<Html5Qrcode>();
  const [rst, setRst] = useState<Html5QrcodeResult>();

  const start = () => {
    if (instance.current) {
      instance.current.start(
        {
          facingMode: 'environment',
        },
        {
          fps: 2, // 可选，每秒帧扫描二维码
          // qrbox: { width: 250, height: 250 }, // 可选，如果你想要有界框UI
          qrbox: 280,
          // aspectRatio: window.devicePixelRatio,
        },
        (decodedText: string, result: Html5QrcodeResult) => {
          console.log('qrCodeSuccessCallback decodedText: ', decodedText);
          console.log('qrCodeSuccessCallback result: ', result);
          setRst(result);
        },
        (errorMessage: string, error: Html5QrcodeError) => {
          console.log('qrCodeErrorCallback errorMessage: ', errorMessage);
          console.log('qrCodeErrorCallback error: ', error);
        },
      );
    }
  };

  const getCameras = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        instance.current = new Html5Qrcode('qr-code-reader');
        start();
      } else {
        console.log('No cameras found.');
      }
    } catch (error) {
      console.log('没有找到相机:', error);
      alert('没有找到相机');
    }
  };

  const stop = () => {
    if (instance.current) {
      instance.current
        .stop()
        .then((ignore: any) => {
          // QR Code scanning is stopped.
          console.log('QR Code scanning stopped.');
        })
        .catch((err: any) => {
          // Stop failed, handle it.
          console.log('Unable to stop scanning.');
        });
    }
  };

  useEffect(() => {
    getCameras();
    return () => {
      stop();
    };
  }, []);

  return (
    <div className={style.box}>
      <div
        className={style.qrCode}
        id="qr-code-reader"
        style={{ width: '100%', height: '100%' }}
      ></div>
      <pre className={style.log}>{!rst ?? JSON.stringify(rst, null, 2)}</pre>
    </div>
  );
};

export default QRCodeScannerCom;
