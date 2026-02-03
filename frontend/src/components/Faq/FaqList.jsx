import { faqs } from './../../assets/data/faqs';
import FaqItem from './FaqItem';

function FaqList() {
  return (
    <div className="mt-[38px] space-y-5">
      {faqs.map((item, index) => (
        <FaqItem item={item} key={index} />
      ))}
    </div>
  );
}

export default FaqList;
