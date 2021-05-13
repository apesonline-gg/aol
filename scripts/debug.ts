import { parseEther } from "@ethersproject/units";

async function main() {
    const supply = parseEther("100000000");
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
