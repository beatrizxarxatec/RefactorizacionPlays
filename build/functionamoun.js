function amount(invoices, plays) {
    let totalAmount = 0;
    switch (plays.type) {
        case "tragedy":
            totalAmount = 40000;
            if (invoices.audience > 30) {
                totalAmount += 1000 * (invoices.audience - 30);
            }
            break;
        case "comedy":
            totalAmount = 30000;
            if (invoices.audience > 20) {
                totalAmount += 10000 + 500 * (invoices.audience - 20);
            }
            totalAmount += 300 * invoices.audience;
            break;
        default:
            throw new Error(`Tipo desconocido: ${plays.type}`);
    }
    return totalAmount;
}
export {};
