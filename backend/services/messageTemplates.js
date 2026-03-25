exports.messages = {

  confirmed: (date, time, clinicNumber) =>
`Hello,
Your appointment at SLVC Clinic, Vashi is successfully confirmed for ${date} at ${time}.
Please visit the clinic 10 minutes before your scheduled time.
For any queries, contact: +918369559053.
Thank you for choosing SLVC Clinic.`,

  cancelled: (date, time, clinicNumber) =>
`Hello,
Your appointment scheduled on ${date} at ${time} at SLVC Clinic has been successfully cancelled.
For rebooking, please contact us at: +918369559053
Thank you.`,

  rescheduled: (doctor, newDate, newTime, clinicNumber) =>
`Hello,
Your appointment with Dr. ${doctor} – SLVC Clinic has been rescheduled.
New Date: ${newDate}
New Time: ${newTime}
Kindly arrive 10 minutes early.
For queries contact: +918369559053.
Thank you for your cooperation.`,

  reminder: (date, time, clinicNumber) =>
`Hello,
This is a gentle reminder of your appointment at SLVC Clinic, Vashi.
Date: ${date}
Time: ${time}
Kindly arrive 10 minutes early.
For any changes, please contact us at +918369559053.
Thank you!`
};