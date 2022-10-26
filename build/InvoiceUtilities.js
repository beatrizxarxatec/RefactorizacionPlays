export class InvoiceUtilities {
    static printInvoice(invoices, plays) {
        const summaries = InvoiceUtilities.GetInvoiceSummaries(invoices, plays);
        let totalAmount = 0; //  monto total
        let volumeCredits = 0;
        let result = `Detalle de factura para ${invoices[0].customer}\n`;
        for (let summary of summaries) {
            // print line for this order
            result += `${summary.playName}: ${InvoiceUtilities.format(summary.paymentAmount / 100)} (${summary.performanceAudience} asientos)\n`;
            // add volume credits
            volumeCredits += summary.credits;
            totalAmount += summary.paymentAmount;
        }
        result += `Total a pagar ${InvoiceUtilities.format(totalAmount / 100)}\n`;
        result += `Has ganado ${volumeCredits} creditos\n`;
        return result;
    }
    static GetInvoiceSummaries(invoices, plays) {
        const summaries = [];
        for (let perf of invoices[0].performances) {
            const play = plays[perf.playID];
            const summary = InvoiceUtilities.GetPerformanceSummary(perf, play);
            summaries.push(summary);
        }
        return summaries;
    }
    static GetPerformanceSummary(perf, play) {
        const thisAmount = InvoiceUtilities.GetPaymentAmount(perf, play);
        const thisCredits = InvoiceUtilities.GetCredits(perf, play);
        const summary = {
            playName: play.name,
            performanceAudience: perf.audience,
            paymentAmount: thisAmount,
            credits: thisCredits,
        };
        return summary;
    }
    static GetCredits(perf, play) {
        let thisCredits = Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type)
            thisCredits += Math.floor(perf.audience / 5);
        return thisCredits;
    }
    static GetPaymentAmount(perf, play) {
        let thisAmount = 0;
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`Tipo desconocido: ${play.type}`);
        }
        return thisAmount;
    }
}
InvoiceUtilities.format = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format;
