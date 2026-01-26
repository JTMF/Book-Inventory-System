import TransactionList from "../components/TransactionList"

const TransactionPage = () => {
  return (
    <div style={{
      maxWidth: 1400,
      margin: "0 auto",
      padding: "24px"
    }}>
      <TransactionList />
    </div>
  )
}

export default TransactionPage