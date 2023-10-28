import "./styles.scss";

import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";

const Login = () => {
  const handleOnSubmit: React.FormEventHandler<HTMLButtonElement> = (event) => {
    console.log(event);
  };

  return (
    <div className="loginContainer">
      <Header />
      <Form onSubmit={handleOnSubmit} />
      <Footer />
    </div>
  );
};

export default Login;
