import React, { Component } from "react";
import autoBind from "react-autobind";

export default class Board extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "grid",
            background: "blue",
            gridTemplateColumns: " repeat(5, 10%) ",
            justifyContent: "center",
            columnGap: "2%"
          }}
        >
          <img style={{ width: "100%" }} src="/policyLib.png" />
          <img style={{ width: "100%" }} src="/policyLib.png" />
          <img style={{ width: "100%" }} src="/policyLib.png" />
          <img style={{ width: "100%" }} src="/policyLib.png" />
          <img style={{ width: "100%" }} src="/policyLib.png" />
        </div>
        <div
          style={{
            display: "grid",
            background: "red",
            gridTemplateColumns: " repeat(6, 10%) ",
            justifyContent: "center",
            columnGap: "2%"
          }}
        >
          <img style={{ width: "100%" }} src="/policyFas.png" />
          <img style={{ width: "100%" }} src="/policyFas.png" />
          {/* <img style={{ width: "100%" }} src="/policyFas.png" />
          <img style={{ width: "100%" }} src="/policyFas.png" />
          <img style={{ width: "100%" }} src="/policyFas.png" />
          <img style={{ width: "100%" }} src="/policyFas.png" /> */}
          <p
            style={{
              color: "#fff",
              gridColumn: "3/4",
              gridRow: "1/2",
              fontSize: "12px"
            }}
          >
            The President Examines The Top Three Cards
          </p>
          <p
            style={{
              color: "#fff",
              gridColumn: "4/5",
              gridRow: "1/2",
              fontSize: "12px"
            }}
          >
            The President Must Kill A Player
          </p>
          <p
            style={{
              color: "#fff",
              gridColumn: "5/6",
              gridRow: "1/2",
              fontSize: "12px"
            }}
          >
            The President Must Kill A Player.Veto Power is enabled
          </p>
          <p
            style={{
              color: "#fff",
              gridColumn: "6/7",
              gridRow: "1/2",
              fontSize: "12px"
            }}
          >
            Skull Face
          </p>
        </div>
      </div>
    );
  }
}
