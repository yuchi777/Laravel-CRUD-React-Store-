// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


//rcc
import React from 'react';
import axios from '../commons/axios';
// import Header from '../components/Header';
import Products from '../components/Products';
import Layout from '../Layout';

// class App extends React.Component{
//   render(){
//     return(
//       <div className="main">
//           <Header nickname="Admin" age={28} marry={true}/>
//           <Products/>
//       </div>
//     );
//   }
// }



// export default App;
class App extends React.Component {

  

  render() {
    return (
      <Layout>
        <Products />
      </Layout>
    );
  }
}

export default App;