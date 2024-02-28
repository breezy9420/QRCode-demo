import QRCodeScannerCom from '@/components/QRCodeScannerCom';
import style from "./index.less"
export default function IndexPage() {
  return (
    <div className={style.box}>
      <QRCodeScannerCom />
    </div>
  );
}
