import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";

/**
 * Gas estimates
 * Logic: 3,055,681
 * Proxy: 399,028
 *
 * Sum: 3454709 * 135 = 0.466385715 ETH
 *
 * Upgraded logic: 2,385,604
 */


async function main() {
    const gasCost = getGasCost("3454709", "80");
    console.log("Gas cost in ether", gasCost)
}

function getGasCost(gasEstimate: string, gasPrice: string) {
    const gas = parseUnits(gasEstimate, "gwei");
    const gasCost = gas.mul(BigNumber.from(gasPrice));
    return formatEther(gasCost);
}

main()
    .then(() => {
        console.log("Done");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => {
        process.exit();
    });
