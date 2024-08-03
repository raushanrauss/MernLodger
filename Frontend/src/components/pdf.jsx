
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        backgroundColor: '#f4f4f4'
    },
    container: {
        width: '80%',
        margin: '0 auto',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
        fontSize: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#4CAF50',
        paddingBottom: 10
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: 20
    },
    tableHeader: {
        backgroundColor: '#4CAF50',
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#333'
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableCell: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        textAlign: 'left',
        verticalAlign: 'middle',
        fontSize: 10
    },
    tableCellHeader: {
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold'
    },
    tableCellEven: {
        backgroundColor: '#f9f9f9'
    },
    tableCellOdd: {
        backgroundColor: '#fff'
    },
    tableCellHover: {
        backgroundColor: '#f1f1f1'
    },
    summary: {
        marginTop: 20,
        borderTopWidth: 2,
        borderTopColor: '#4CAF50',
        paddingTop: 10,
        fontSize: 11,
        color: '#333',
        display: 'flex',
        justifyContent: 'space-between'
    },
    summaryItem: {
        fontWeight: 'bold'
    }
});

// Define a function to format the date (replace this with your actual date formatting function)
const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

// Define the Document Component
const MyDocument = ({ transactions }) => {
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <Text style={styles.header}>Transactions Report</Text>
                    <View style={styles.tableWrapper}>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableCellHeader]}>Title</Text>
                                <Text style={[styles.tableCell, styles.tableCellHeader]}>Amount</Text>
                                <Text style={[styles.tableCell, styles.tableCellHeader]}>Category</Text>
                                <Text style={[styles.tableCell, styles.tableCellHeader]}>Description</Text>
                                <Text style={[styles.tableCell, styles.tableCellHeader]}>Date</Text>
                                <Text style={[styles.tableCell, styles.tableCellHeader]}>Transaction Type</Text>
                            </View>
                            {transactions.map((expense, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.tableRow,
                                        index % 2 === 0 ? styles.tableCellEven : styles.tableCellOdd
                                    ]}
                                >
                                    <Text style={styles.tableCell}>{expense.title}</Text>
                                    <Text style={styles.tableCell}>{expense.amount}</Text>
                                    <Text style={styles.tableCell}>{expense.category}</Text>
                                    <Text style={styles.tableCell}>{expense.description}</Text>
                                    <Text style={styles.tableCell}>{formatDate(expense.date)}</Text>
                                    <Text style={styles.tableCell}>{expense.transactionType}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.summary}>
                        <Text style={styles.summaryItem}>Total Transactions: {transactions.length}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
