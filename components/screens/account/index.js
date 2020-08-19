import React from "react";
import { Card, Col, Button, Table, Badge } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import DepositModal from "../../transaction-request/DepositModal";
import WithdrawalModal from "../../transaction-request/WithdrawalModal";
import useAuth from "../../../hooks/auth";
import useTransactions from "../../../hooks/transactions";
import { fadeIn, fadeInWithDelay } from "../../animations";
import Plan from "./Plan";

const formatDate = (iso) => {
  var options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(iso).toLocaleDateString("en-US", options);
  const time = new Date(iso).toLocaleTimeString("en-US");
  return {
    date,
    time,
  };
};

const CompleteProfile = styled.div`
  display: ${(props) => (props.updated ? "block" : "none")};
`;

const IncompleteProfile = styled.div`
  position: static;
  top: 50vh;
  margin: auto;
  display: ${(props) => (props.updated ? "none" : "block")};
  animation: ${fadeInWithDelay} 4s linear;
  transition: all 0.3s ease-in;
`;
const Loading = styled.div`
  position: fixed;
  top: 50vh;
  margin: auto;
  font-size: 2em;
`;

const Acct = styled.div`
  animation: ${fadeIn} 1s ease-out;
  transition: all 0.3s ease-in;
  width: 100%;
  background: rgba(0, 255, 0, 0.04);
  margin-top: 100px !important;
  padding: 40px 2vw 50px 2vw;
`;

const ItemCard = styled(Card)`
  border: none;
  transition: all 0.3s ease-in;
  border-left: 2px solid orange;
  margin: 20px 0 0 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
const Profile = styled(ItemCard)`
  border-left: none;
`;
const Header = styled(ItemCard)`
  background: rgba(0, 0, 0, 0.2);
  border-left: none;
  position: relative;
`;
const Transactions = styled(ItemCard)`
  border-left: none;
`;

const Div = styled.div`
  margin: auto;
  width: 120px;
  height: 120px;
  border: 4px solid #e0e0e0;
  border-radius: 50%;
  position: relative;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WhenUser = styled.div`
  margin: auto;
  width: 120px;
  height: 120px;
  border: 4px solid #e0e0e0;
  border-radius: 50%;
  position: relative;
  background-image: url(${(props) => props.url});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Edit = styled.div`
  width: fit-content;
  margin: 20px auto;
`;

const Text = styled.div`
  opacity: 1;
  text-align: center;
  cursor: pointer;
  padding: 7px 0px;
  border-radius: 30px;
  &:hover {
    background: orange;
    color: white;
  }
  &:hover:nth-child(2) {
    background: none;
    color: black;
    cursor: context-menu;
  }
  &:hover:nth-child(3) {
    background: none;
    color: black;
    cursor: context-menu;
  }
  &:hover:nth-child(4) {
    background: none;
    color: black;
    cursor: context-menu;
  }
`;
const Span = styled.span`
  margin: 0 20px;
`;
const Balance = styled(Col)`
  color: white;
  letter-spacing: 3px;
  background: rgba(0, 0, 0, 0.4);
  padding: 3px 15px;
  border-radius: 15px;
  font-weight: bold;
`;
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Account = () => {
  const {
    depositOpen,
    hideDeposit,
    openDeposit,
    withdrawalOpen,
    hideWithdrawal,
    openWithdrawal,
    userTransactions,
    postTransaction,
    transLoading,
    setPlan,
    planOpen,
    hidePlan,
    openPlan,
  } = useTransactions();
  const { data, userDetails, detailsUpdated, signOut } = useAuth();
  const router = useRouter();

  data && !data.isAuth && router.push("/sign-in");

  const getTransactions = () => {
    if (userTransactions.length) {
      userTransactions.sort(function (a, b) {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      return userTransactions.reverse().map((e, i) => {
        const { date, time } = formatDate(e.date);
        return (
          <tr key={e.id}>
            <td>{i + 1}</td>
            <td>{e.type}</td>
            <td>{`${date} / ${time}`}</td>
            <td>₦{e.amount}</td>
            <td>
              <Badge variant={`${e.status ? "success" : "secondary"}`}>
                {e.status ? "approved" : "requested"}
              </Badge>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <Container style={{ width: "100vw" }}>
      {!data && <Loading>Loading...</Loading>}
      <IncompleteProfile updated={detailsUpdated}>
        <Link href="/settings/edit-profile">
          <a>
            Welcome to BetterLife Micro-Savings International Company Limited.
            Proceed to complete your registration &#8594;
          </a>
        </Link>
      </IncompleteProfile>
      <CompleteProfile updated={detailsUpdated}>
        <Plan
          open={planOpen}
          close={hidePlan}
          setPlan={setPlan}
          loading={transLoading}
        />
        <DepositModal
          open={depositOpen}
          close={hideDeposit}
          userDetails={userDetails}
          postTransaction={postTransaction}
          transLoading={transLoading}
        />
        <WithdrawalModal
          open={withdrawalOpen}
          close={hideWithdrawal}
          userDetails={userDetails}
          postTransaction={postTransaction}
          transLoading={transLoading}
        />
        <Acct className="row">
          <Col md={3}>
            <Profile>
              {userDetails && (
                <Card.Body>
                  {userDetails.url ? (
                    <WhenUser url={userDetails.url}>
                      <Link href={`/settings/edit-profile`}>
                        <a>
                          {" "}
                          <FontAwesomeIcon icon="pencil-alt" color="bue" />
                        </a>
                      </Link>
                    </WhenUser>
                  ) : (
                    <Div>
                      <Link href={`/settings/edit-profile`}>
                        <a>
                          <FontAwesomeIcon icon="pencil-alt" color="grey" />
                        </a>
                      </Link>
                    </Div>
                  )}

                  <Text className=" top mt-3">
                    {userDetails.displayName || ""}
                  </Text>
                  <Text className=" top">{userDetails.email || ""}</Text>
                  <Text className=" top">{userDetails.state || ""}</Text>
                  <Edit>
                    <Button variant="default" size="sm">
                      <Link href={`/settings/edit-profile`}>
                        <a>
                          <small>Edit Profile</small>
                        </a>
                      </Link>
                      <span className="ml-2">
                        <FontAwesomeIcon icon="edit" color="grey" />
                      </span>
                    </Button>
                  </Edit>
                  <br />
                  <Text onClick={() => openDeposit()}>Deposit fund</Text>
                  <Text onClick={() => openWithdrawal()}>Widthdraw fund</Text>
                  <Text>Get support</Text>
                  <Text onClick={() => signOut()}>Logout</Text>
                </Card.Body>
              )}
            </Profile>
          </Col>

          <Col md={9}>
            <Header>
              {userDetails && (
                <Card.Body>
                  <Card.Title className="text-center text-primary">
                    <strong>DASHBOARD</strong>
                  </Card.Title>
                  <div className="text-left row m-2">
                    <Col sm={6}>ACCOUNT NUMBER:</Col>
                    <Balance sm={6}>{userDetails.phoneNumber || ""}</Balance>
                  </div>
                  <div className="text-left row m-2">
                    <Col sm={6}>BALANCE:</Col>
                    <Balance sm={6}>
                      ₦{userDetails.accountBalance || 0.0}
                    </Balance>
                  </div>
                  <div className="text-left row m-2">
                    <Col sm={6}>SAVINGS PLAN:</Col>
                    {userDetails.plan ? (
                      <Balance sm={6}>{userDetails.plan}</Balance>
                    ) : (
                      <Button size='sm' onClick={() => openPlan()}>
                        Select a Savings Plan
                      </Button>
                    )}
                  </div>
                </Card.Body>
              )}
            </Header>
            <Transactions>
              <Card.Body>
                <Card.Title className="text-center text-primary">
                  <strong>Transaction History</strong>
                </Card.Title>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{getTransactions()}</tbody>
                </Table>
              </Card.Body>
            </Transactions>
          </Col>
        </Acct>
      </CompleteProfile>
    </Container>
  );
};
export default Account;
