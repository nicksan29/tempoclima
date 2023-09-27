import { useState } from "react";


function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=cddb49a66f7c48b7ae5163609232509&q=${city}&lang=pt`
    ).then((response) => {
      if(response.status == 200){
        return response.json()
      }
    })
    .then((data) => {
      setWeatherForecast(data)
    });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Micheal Previsão do tempo
        </a>
      </nav>

      <main className="container">
      <div className="jumbotron">
        <h1>
          Verifique agora a previsão do tempo de sua cidade
        </h1>
        <p className="lead">
          Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
        </p>
        <div className="row mb-4">
          <div className="col-md-6">
            <input onChange={handleChange}
            className="form-control"
            value={city}/>
          </div>
        </div>
        <button  onClick={handleSearch} className="btn btn-primary btn-lg">
          Pesquisar
        </button>

        {
          weatherForecast ? (
          <div className="mt-4">
          <div>
            <img src={weatherForecast.current.condition.icon}/>
          </div>
          
          <div>
            <h3>
              Hoje o dia está: {weatherForecast.current.condition.text}
            </h3>
          </div>
          <div>

            <h3>
              {weatherForecast.current.feelslike_c} Graus
            </h3>
          </div>
          
        </div>
          ) :null
        }

      </div>
      </main>
    </div>
  );
}

export default App;
