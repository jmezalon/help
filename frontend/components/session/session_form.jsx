
import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      firstNameValue: "",
      lastNameValue: "",
      monthValue: "",
      dayValue: "",
      yearValue: "",
      zipCodeValue: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.dayChange = this.dayChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.zipCodeChange = this.zipCodeChange.bind(this);
  }

  componentWillReceiveProps() {

  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.props.formType === "login"){
      this.props.processForm({email: this.state.emailValue, password: this.state.passwordValue});
    } else {
      this.props.processForm({
        email: this.state.emailValue,
        password: this.state.passwordValue,
        first_name: this.state.firstNameValue,
        last_name: this.state.lastNameValue,
        birthday: `${this.state.yearValue}-${this.state.monthValue}-${this.state.dayValue}`,
        zip_code: this.state.zipCodeValue
      });
    }
  }

  emailChange(event){
    this.setState({emailValue: event.target.value});
  }

  passwordChange(event) {
    this.setState({passwordValue: event.target.value});
  }

  firstNameChange(event) {
    this.setState({firstNameValue: event.target.value});
  }

  lastNameChange(event) {
    this.setState({lastNameValue: event.target.value});
  }

  monthChange(event) {
    this.setState({monthValue: event.target.value});
  }

  dayChange(event) {
    this.setState({dayValue: event.target.value});
  }

  yearChange(event) {
    this.setState({yearValue: event.target.value});
  }

  zipCodeChange(event) {
    this.setState({zipCodeValue: event.target.value});
  }

  nameInputs() {
    return (
        <ul className="name-inputs">
          <li>
            <input type="text" placeholder="First Name" value={this.state.firstNameValue}
            onChange={this.firstNameChange}/>
          </li>
          <li>
            <input type="text" placeholder="Last Name" value={this.state.lastNameValue}
            onChange={this.lastNameChange}/>
          </li>
        </ul>
    );
  }

  zipCodeInput() {
    return (
      <li>
        <input type="text" placeholder="Zip Code" value={this.state.zipCodeValue}
        onChange={this.zipCodeChange}/>
      </li>
    );
  }

  dropDownYear() {
    let year = new Date().getFullYear();
    let years = [];
    for(let i = year; i > 1900; i--){
      years.push(i);
    }
    return years.map((yr, idx) => {
      return <option key={idx}>{yr}</option>;
    });
  }

  dropDownMonth() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, idx) => {
      return <option key={idx}>{month}</option>;
    });
  }

  dropDownDay() {
    let days = [];
    for(let i = 1; i < 32; i++){
      days.push(i);
    }
    return days.map((day, idx) => {
      return <option key={idx}>{day}</option>;
    });
  }

  allDropDowns() {
    return (
      <div>
        <ul className="birthday-text">
          <li className='birthday'>Birthday</li>
          <li className='optional'>Optional</li>
        </ul>

          <ul>
            <li>
              <select className="MonthDrop" onChange={this.monthChange}>
                <option defaultValue>Month</option>
                {this.dropDownMonth()}

              </select>
            </li>
            <li>
              <select className="DayDrop" onChange={this.dayChange}>
                <option defaultValue>Day</option>
                {this.dropDownDay()}
              </select>
            </li>
          <li>
            <select className="YearDrop" onChange={this.yearChange}>
              <option defaultValue> Year</option>
              {this.dropDownYear()}
            </select>
          </li>
          </ul>
        </div>
    );
  }



  render(){
    const errs = this.props.errors.map((err) => {
      return <li>{err}</li>;
    });


    return(
    <div>
      <header>
        {this.props.formType === '/login' ? "Log In to Help" : "Sign Up for Help"}

        <ul>
          {errs}
        </ul>
      </header>

      <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            {this.props.formType === "/signup" ? this.nameInputs() : ""}
          </li>
          <li>
            <input type="text" onChange={this.emailChange} value={this.state.emailValue}
              placeholder="Email"/>
          </li>
          <li>
            <input type="password" onChange={this.passwordChange} value={this.state.passwordValue}
              placeholder="Password"/>
          </li>
          {this.props.formType === "/signup" ? this.zipCodeInput() : ""}
          {this.props.formType === "/signup" ? this.allDropDowns() : ""}
        </ul>



        <button className={"submitButton"}>{this.props.formType === '/login' ? "Log In" : "Sign Up"}</button>

      </form>
        <Link to={this.props.formType === '/login' ? '/signup' : '/login'}>{this.props.formType === '/login' ? "Sign Up" : "Log In"}</Link>
    </div>
  );
  }
}

export default SessionForm;
