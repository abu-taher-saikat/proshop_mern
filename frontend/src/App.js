import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <HomeScreen></HomeScreen>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
