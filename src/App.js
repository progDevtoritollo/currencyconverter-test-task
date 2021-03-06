import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const URL_API =
    "https://api.apilayer.com/fixer/latest?apikey=fMQhPYPZqPNmbszXkuH91iZKXyEzV7QP";

  const [rates, setRates] = useState({});
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setcurrency1] = useState("USD");
  const [currency2, setcurrency2] = useState("UAH");

  useEffect(() => {
    axios.get(URL_API).then((res) => {
      console.log(res);
      setRates(res.data.rates);
    });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
      console.log(rates);
    }
  }, [rates]);

  const handleAmount1Change = (amount1) => {
    setAmount2(roundUp((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  };
  const handleCurrency1Change = (currency1) => {
    setAmount2(roundUp((amount1 * rates[currency2]) / rates[currency1]));
    setcurrency1(currency1);
  };

  const handleAmount2Change = (amount2) => {
    setAmount1(roundUp((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  };
  const handleCurrency2Change = (currency2) => {
    setAmount1(roundUp((amount2 * rates[currency1]) / rates[currency2]));
    setcurrency2(currency2);
  };

  const currencyCalculate = (currency) => {
    return roundUp((1 * rates["UAH"]) / rates[currency]);
  };

  const roundUp = (val) => {
    return val.toFixed(2);
  };
  return (
    <div className="App">
      <header>
        <h1 className="UAH">UAH - </h1>
        <h1>EUR:{currencyCalculate("EUR")}</h1>
        <h1>USD:{currencyCalculate("USD")}</h1>
      </header>
      <div className="content">
        <CurrencyInput
          onSelectChange={handleCurrency1Change}
          onAmountChange={handleAmount1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          onSelectChange={handleCurrency2Change}
          onAmountChange={handleAmount2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </div>
  );
}

export default App;
