import React, { useState } from "react";
import styled from "styled-components";
import { FileCopy } from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { mobile } from "../responsive";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import easyinvoice from "easyinvoice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  display: grid;
  place-content: center;
  background-color: teal;
  padding: 20px;
  ${mobile({ marginTop: "90px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Checkout = ({ cartx, sumx, id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [addressn, setAddressn] = useState("");
  const [ssn, setSsn] = useState(sumx * 1 + 2000 * 1);

  const publicKey = "pk_test_d019865040e3fde8597d6c1c0aa7f380dabb5dce";
  const navigate = useNavigate();

  const deliveryFees = (e) => {
    setAddressn(e.target.value);
    if (e.target.value == "Ogun") {
      setSsn(sumx * 1 + 2000 * 1);
    } else if (e.target.value == "Lagos") {
      setSsn(sumx * 1 + 4000 * 1);
    } else if (e.target.value == "Ife") {
      setSsn(sumx * 1 + 5000 * 1);
    } else if (e.target.value == "Others") {
      setSsn(sumx * 1 + 8000 * 1);
    }
  };

  const componentProps = {
    email,
    amount: ssn * 100,
    metadata: {
      name,
      phoneNumber,
    },
    publicKey,
    text: "Paid",
    onSuccess: () => handleClick(),
    onClose: () => alert("Wait! You need this, don't go!!!!"),
  };

  const settleCart = async (e) => {
    const response = await fetch(
      `https://threadsandtextiles.adaptable.app/api/carts/${localStorage.getItem(
        "name"
      )}`,
      {
        method: "DELETE",
      }
    );
  };

  //Import the library into your project
  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      // The logo on top of your invoice
      logo: "https://th.bing.com/th/id/OIP.aIwnrchUyqICEj-ZuRlPNwAAAA?pid=ImgDet&rs=1",
      // The invoice background
      background: "https://wallpapercave.com/wp/wp2662866.jpg",
    },
    // Your own data
    sender: {
      company: "Threads And Textiles",
      address: "Plot 60 Ejio Rd arigbajo ewekoro L.G.A ogun state",
      zip: "",
      city: "Ewekoro",
      country: "Nigeria",
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    client: {
      company: name,
      address: address,
      zip: address,
      city: address,
      country: "Nigeria",
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: "2021.0001",
      // Invoice data
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: cartx.map((product) => {
      const { name, ...rest } = product;
      return { description: name, "tax-rate": 0, ...rest };
    }),
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Thanks for patronizing Threads And Textiles",
    // Settings to customize your invoice
    settings: {
      currency: "NGN", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
      // "invoice": "FACTUUR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal", // Defaults to 'Total'
       "vat": 0 // Defaults to 'vat'
    },
  };

  //Create your invoice! Easy!
  // var fs = require("fs");
  //Create your invoice! Easy!
  const createInvoice = async () => {
    easyinvoice.createInvoice(data, async function (result) {
      //The response will contain a base64 encoded PDF file
      console.log(result);
      //await fs.writeFileSync("invoice.pdf", result.pdf, "base64");
      easyinvoice.download("myInvoice.pdf", result.pdf);
    });
  };

  const handleClick = () => {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log(downloadURL);
          order(downloadURL);
        });
      }
    );
  };

  const order = async (downloadURL) => {
    const response = await fetch(
      "https://threadsandtextiles.adaptable.app/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          products: cartx,
          amounts: ssn,
          address,
          number: phoneNumber,
          email,
          img: downloadURL,
          note,
        }),
      }
    );

    const data = await response.json();
    if (data === "Order Placed") {
      settleCart();
      createInvoice();
      alert("Order Completed");
      navigate("/");
    } else {
      alert("an error occured");
    }
  };

  const copyText = () => {
    var copyText = "0561710498";
    navigator.clipboard.writeText(copyText);

    alert("Acount Number Copied To ClipBoard");
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <center>
            <b style={{ color: "white" }}>T&T</b>
          </center>
          CheckOut
        </Title>
        <Wrapper2>
          <br />
          <div
            style={{
              display: "block",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <p style={{ textDecoration: "underline" }}>
              Pay with transfer to the account below
            </p>
            <br />
            <h5 style={{ color: "red" }}>
              0052719805{" "}
              <FileCopy style={{ color: "black" }} onClick={copyText} />{" "}
            </h5>
            <h5 style={{ color: "red" }}>Gt Bank</h5>
            <h5 style={{ color: "red" }}>Olapade Olufemi Joseph</h5>
          </div>
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input placeholder="Name" value={"₦" + ssn} />
          <Input
            placeholder="phone Number"
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <Input
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <h5 style={{ color: "red" }}>Delivery charges included</h5>
          <br />
          <select onChange={deliveryFees}>
            <option>Ogun</option>
            <option>Lagos</option>
            <option>Ife</option>
            <option>Others</option>
          </select>
          <Input placeholder="Note" onChange={(e) => setNote(e.target.value)} />
          <br />
          <p style={{ textDecoration: "underline", display: "block" }}>
            Payment Proof:{" "}
          </p>
          <Input
            placeholder="Payment Proof"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "block" }}
          />

          <PaystackButton className="paystack-button" {...componentProps} />

          <Link>Payments would be confirmed</Link>
          <Link>and your order would be ready</Link>
        </Wrapper2>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
