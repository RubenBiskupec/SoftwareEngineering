import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductSalesChart from "../../charts/ProductSalesChart";
import { format } from "date-fns";

class ProductSalesChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      interval: "hour",
      retrieve: false,
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleRetrieveButton = this.handleRetrieveButton.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
  }

  handleStartDateChange(date) {
    this.setState({ startDate: date });
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date });
  }

  handleIntervalChange(event) {
    this.setState({ interval: event.target.value });
  }

  handleRetrieveButton() {
    this.setState({ retrieve: true });
  }

  onLoaded() {
    this.setState({ retrieve: false });
  }

  renderIntervalSelect() {
    return (
      <select
        id="interval"
        value={this.state.interval}
        onChange={this.handleIntervalChange}
        className={"form-control"}
      >
        <option value="hour">hour</option>
        <option value="day">day</option>
      </select>
    );
  }

  renderSalesChart() {
    return (
      <ProductSalesChart
        retrieve={this.state.retrieve}
        identifier={this.props.identifier}
        text={this.props.text}
        start={format(this.state.startDate, "yyyy-MM-dd")}
        end={format(this.state.endDate, "yyyy-MM-dd")}
        interval={this.state.interval}
        onLoaded={this.onLoaded}
      />
    );
  }

  render() {
    return (
      <div className="input-group">
        <div>
          <h3>Start Date</h3>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
            dateFormat={"dd-MM-yyyy"}
            inline
            maxDate={this.state.endDate}
          />
        </div>
        <div>
          <h3>End Date</h3>
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
            dateFormat={"dd-MM-yyyy"}
            inline
            minDate={this.state.startDate}
          />
        </div>
        <div className="input-group mt-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Interval
            </span>
          </div>
          {this.renderIntervalSelect()}
        </div>
        <button
          className={"btn btn-secondary mt-2 btn-block"}
          onClick={this.handleRetrieveButton}
        >
          retrieve
        </button>
        {this.renderSalesChart()}
      </div>
    );
  }
}

export default ProductSalesChartWrapper;
