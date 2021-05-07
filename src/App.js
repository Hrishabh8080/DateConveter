import './App.css';
import React, { Component } from 'react'
class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      input: '',
      current: new Date().toUTCString(),
      currentdate: new Date().toLocaleDateString(),
      updatedDate: '0 day'
    }
  }

  getData = e => {
    this.setState({ input: e.target.value })
  }
  updateDate = () => {
    if (this.state.updatedDate === null || this.state.input === '') {
      //  this.setState({ updatedDate: '0 day' })
      alert("enter valid date")
    }
    else {
      
      let diff = new Date(this.state.input) - new Date();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      let x = setInterval(() => {
        
        let diff = new Date(this.state.input) - new Date();
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        this.setState({ updatedDate: `${days} d : ${hours} h :${minutes} m : ${seconds} s` });
        if (diff < 0) {
          clearInterval(x);
          this.setState({ updatedDate: "Expire Date/CountDown" })
        }
        
      }, 1000);
      const item = { date: this.state.input, days: days };
      this.setState({ items: this.state.items.concat(item) });
      console.log(this.state.items)
      //    console.log(this.state.updatedDate);
    }
  }
  
  render() {
    return (
      <div>
        <div className="App">
          <div className="card__layout">
            <h2 className="card__heading">{this.state.current}</h2>
            <h2 className="card__heading">{this.state.updatedDate}</h2>

            <input value={this.state.input} onChange={this.getData} className="card__input" type="date" required className="card__input" /><br />
            <button onClick={this.updateDate} className='card__btn'>Submit</button>
            <div className="history__container">
              <h3 className="history__heading">History</h3>
              {
                this.state.items.length > 0 ?
                  this.state.items.map((item, i) => {
                    return (
                      <div className="history__ptag" key={i}><p className="start">{item.date}</p><p className='end'>{item.days}</p></div>
                    )
                  }) : <p></p>}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;