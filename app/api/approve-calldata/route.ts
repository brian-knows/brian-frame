import { encodeFunctionData } from "viem";
import { getBrianTransactionOptions } from "../../../lib/kv";
import { ERC20_ABI } from "../../../lib/constants/erc20";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const url = new URL(req.url);
  const { searchParams } = url;

  const id = searchParams.get("id");
  const userChoice = searchParams.get("choice");
  // get data from request id
  const transactionData = await getBrianTransactionOptions(id!);
  // get the transaction calldata of the chosen transaction object
  const transactionCalldataForUser =
    transactionData?.result?.data!;
  // get the transaction values of the chosen transaction object
  const tokenAddress = transactionCalldataForUser.fromToken.address;
  const spender = transactionCalldataForUser.steps[0]?.to;
  const amount = transactionCalldataForUser.fromAmount;
  console.log("tokenAddress", tokenAddress);
  console.log("spender", spender);
  console.log("amount", amount);

  const chainId = transactionCalldataForUser.steps[0]?.chainId;
  console.log("chainId", chainId);

  const approveData = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: "approve",
    args: [spender, amount],
  });
  console.log("approveData", approveData);

  return NextResponse.json({
    chainId: "eip155:".concat(chainId!.toString()),
    method: "eth_sendTransaction",
    params: {
      abi: ERC20_ABI,
      to: tokenAddress as `0x${string}`,
      data: approveData,
      value: "0x0000000000000000000000000000000000000000",
    },
  });
};
