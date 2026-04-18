// import { NextRequest, NextResponse } from "next/server";





// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const tokenData = await getToken();

//     const order = {
//       id: `ORDER-${Date.now()}`,
//       currency: "KES",
//       amount: body.amount,
//       description: "E-commerce Order",
//       callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal/callback`,
//       notification_id: IPN_URL, // from Pesapal dashboard
//       billing_address: {
//         email_address: body.email,
//         country_code: "KE"
//       },
//     };

//     const res = await fetch(`${BASE_URL}/api/Transactions/SubmitOrderRequest`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${tokenData.token}`,
//       },
//       body: JSON.stringify(order),
//     });

//     const data = await res.json();

//     return NextResponse.json({
//       redirect_url: data.redirect_url,
//     });
//   } catch (err) {
//     return NextResponse.json({ error: "Payment failed" }, { status: 500 });
//   }
// }