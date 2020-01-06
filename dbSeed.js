/*
 * This script was written to work with 'ebrisoft/Backend' on branch
 * 'feature/UsabilityTesting'. It may not work as expected when used 
 * with other branches.
 */
const https = require("https")
const axios = require("axios")
axios.defaults.withCredentials = true;

const API_ENDPONT = "https://localhost:44378/api/v1"

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
	withCredentials: true
})

let cookie = null;

axios.interceptors.response.use(response => {

	if (response.headers['set-cookie']) {
		cookie = response.headers['set-cookie'];
	}

	return response;
});

axios.interceptors.request.use(config => {

	config.headers["cookie"] = cookie;

	return config;
}, error => {
	return Promise.reject(error);
});

const STEPS = [
	{
		domain: "landlord",
		action: "register",
		payload: {
			"Name": "Mike Jones",
			"UserName": "mike.jones@notgmail.com",
			"Email": "mike.jones@notgmail.com",
			"PhoneNumber": "07000000000",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "landlord",
		action: "createhouse",
		payload: {
			"Name": "26 Ebrington Street"
		}
	},
	{
		domain: "landlord",
		action: "createhouse",
		payload: {
			"Name": "5 James Street"
		}
	},
	{
		domain: "landlord",
		action: "setpinboard",
		payload: {
			"HouseId": 1,
			"Text": "WiFi: VI9273661\nPassword: A3hi09091\n\nBins:\nStarting Thurs 02 Jan 2020, alternating general and recycling.\n\nFire Extinguishers & Alarms:\nNext inspection is 4th May 2020\n\nDamp:\nPrevious tenants have said that some places in the house can get damp; there is a pamphlet in the kitchen on preventing this."
		}
	},
	{
		domain: "landlord",
		action: "setpinboard",
		payload: {
			"HouseId": 2,
			"Text": "WiFi: VI9273661\nPassword: A3hi09091\n\nBins:\nStarting Thurs 02 Jan 2020, alternating general and recycling.\n\nFire Extinguishers & Alarms:\nNext inspection is 4th May 2020\n\nDamp:\nPrevious tenants have said that some places in the house can get damp; there is a pamphlet in the kitchen on preventing this."
		}
	},
	{
		domain: "landlord",
		action: "createcontact",
		payload: {
			"HouseId": 1,
			"Name": "Maintenance Ben",
			"PhoneNumber": "07111111111"
		}
	},
	{
		domain: "landlord",
		action: "createcontact",
		payload: {
			"HouseId": 2,
			"Name": "EDF Energy",
			"Email": "edf@notgmail.com",
			"PhoneNumber": "07222222222"
		}
	},
	{
		domain: "landlord",
		action: "createcontact",
		payload: {
			"HouseId": 2,
			"Name": "South West Water",
			"Email": "sww@notgmail.com"
		}
	},
	{
		domain: "landlord",
		action: "createcontact",
		payload: {
			"HouseId": 2,
			"Name": "Internet Provider",
			"Email": "inet-provider@notgmail.com"
		}
	},
	{
		domain: "tenant",
		action: "register",
		payload: {
			"Name": "John Green",
			"UserName": "john.green@notgmail.com",
			"Email": "john.green@notgmail.com",
			"PhoneNumber": "07333333333",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "tenant",
		action: "register",
		payload: {
			"Name": "Emma Reed",
			"UserName": "emma.reed@notgmail.com",
			"Email": "emma.reed@notgmail.com",
			"PhoneNumber": "07444444444",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "tenant",
		action: "register",
		payload: {
			"Name": "Tom Thomson",
			"UserName": "tom.thomson@notgmail.com",
			"Email": "tom.thomson@notgmail.com",
			"PhoneNumber": "07555555555",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "tenant",
		action: "register",
		payload: {
			"Name": "Alice Marshal",
			"UserName": "alice.marshal@notgmail.com",
			"Email": "alice.marshal@notgmail.com",
			"PhoneNumber": "07666666666",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "unauth",
		action: "signin",
		payload: {
			"Email": "mike.jones@notgmail.com",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "landlord",
		action: "addtenant",
		payload: {
			"HouseId": 1,
			"TenantUsername": "john.green@notgmail.com"
		}
	},
	{
		domain: "landlord",
		action: "addtenant",
		payload: {
			"HouseId": 1,
			"TenantUsername": "emma.reed@notgmail.com"
		}
	},
	{
		domain: "landlord",
		action: "addtenant",
		payload: {
			"HouseId": 2,
			"TenantUsername": "tom.thomson@notgmail.com"
		}
	},
	{
		domain: "landlord",
		action: "addtenant",
		payload: {
			"HouseId": 2,
			"TenantUsername": "alice.marshal@notgmail.com"
		}
	},
	{
		domain: "landlord",
		action: "createissue",
		payload: {
			"Title": "Creaky door",
			"Content": "Door is creaky; I will fix on the weekend guys.",
			"HouseId": 1,
			"Priority": 0
		}
	},
	{
		domain: "landlord",
		action: "createissue",
		payload: {
			"Title": "Lock sticking",
			"Content": "Key doesnt turn the lock all the way - the locksmith will be in touch.",
			"HouseId": 2,
			"Priority": 2
		}
	},
	{
		domain: "landlord",
		action: "archive",
		payload: {
			"Id": 2
		}
	},
	{
		domain: "unauth",
		action: "signin",
		payload: {
			"Email": "john.green@notgmail.com",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "tenant",
		action: "createissue",
		payload: {
			"Title": "Both bulbs above the overn are blown",
			"Content": "Neither bulb turns on.",
		}
	},
	{
		domain: "unauth",
		action: "signin",
		payload: {
			"Email": "emma.reed@notgmail.com",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "tenant",
		action: "createissue",
		payload: {
			"Title": "Toilet doesnt flush properly",
			"Content": "I have to repeatedly pull the flusher to get it to work?? Not sure what's going on as it only started happening last week...",
		}
	},
	{
		domain: "unauth",
		action: "signin",
		payload: {
			"Email": "alice.marshal@notgmail.com",
			"Password": "aaaAAA123;"
		}
	},
	{
		domain: "tenant",
		action: "createissue",
		payload: {
			"Title": "Freezer draw has cracked",
			"Content": "Freezer draw has cracked and cant really be used any more - items continually fall out... any chance it can be replaced please?",
		}
	},
	{
		domain: "tenant",
		action: "createissue",
		payload: {
			"Title": "The sink is broken",
			"Content": "It's leaking water from around the base",
		}
	},
	{
		domain: "tenant",
		action: "archive",
		payload: {
			"Id": 6,
		}
	}
]

async function makeRequest(step) {
	const url = `${API_ENDPONT}/${step.domain}/${step.action}`

	console.log(url)

	try {
		const response = await axios.post(url, step.payload, {
			withCredentials: true,
			httpsAgent
		})
		console.log(response.status)
		console.log(response.data)
	} catch (e) {
		console.log("MINOR FUCKUP")
		console.log(e.response.status)
		console.log(e.response.data)
	}
}

async function main() {
	for (let i = 0; i < STEPS.length; i++) {
		console.log("Command: " + i)
		await makeRequest(STEPS[i])
		console.log("\n\n\n\n\n")
	}
}

(async () => {
	try {
		await main();
	} catch (e) {
		console.log("MAJOR FUCKUP")
		console.log(e)
	}
})();
