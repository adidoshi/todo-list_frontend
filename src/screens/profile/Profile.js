import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import DisplayErrorMessage from "../../components/DisplayErrorMessage";
import Loading from "../../components/Loading";
import MainNavbar from "../../components/MainNavbar";
import { updateProfile } from "../../redux/actions/userActions";
import "./Profile.css";

const Profile = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, pic }));
  };

  return (
    <>
      <MainNavbar />
      <div className="container entire">
        {loading && <Loading />}
        {success && (
          <DisplayErrorMessage variant="success">
            Updated successfully
          </DisplayErrorMessage>
        )}
        {error && (
          <DisplayErrorMessage variant="danger">{error}</DisplayErrorMessage>
        )}
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      {!userInfo ? (
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdT-V-FzH7KPg1okL1dzxZBJ40d2pm3TNQfg&usqp=CAU"
                          alt="check url"
                        />
                      ) : (
                        <img src={userInfo.pic} alt="check url" />
                      )}
                    </div>
                    {!userInfo ? (
                      <h5 className="user-name">Check</h5>
                    ) : (
                      <h5 className="user-name">{userInfo.name}</h5>
                    )}

                    {!userInfo ? (
                      <h6 className="user-email">Sample</h6>
                    ) : (
                      <h6 className="user-email">{userInfo.email}</h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Account</h6>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-2">
                      <label htmlFor="pic">Profile pic</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pic"
                        placeholder="Enter profile pic link"
                        value={pic}
                        onChange={(e) => setPic(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="submit"
                        id="submit"
                        name="submit"
                        onClick={submitHandler}
                        className="btn btn-primary mt-3 ms-2">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
