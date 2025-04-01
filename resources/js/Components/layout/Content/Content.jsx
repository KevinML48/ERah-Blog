import "./Content.css";
import ContentTop from '../../../Components/Dashboard-Composants/ContentTop/ContentTop';
import ContentMain from '../../../Components/Dashboard-Composants/ContentMain/ContentMain';

const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <ContentMain />
    </div>
  )
}

export default Content
