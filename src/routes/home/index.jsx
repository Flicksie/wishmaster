import './main.css';
import CalendarView from '../../components/Calendar/CalendarView';
import Wishlist from '../../components/Wishlist/WishlistMain';

function Home() {


  return (
    <div className="App">
      <header className="App-header"> </header>
      <section className="container-main">
        test
        <CalendarView />        
        <Wishlist />        
      </section>
    </div>
  );
}

export default Home;
