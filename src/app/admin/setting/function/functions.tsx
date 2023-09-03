import serverUrl from '@/config/config';

export async function addNewMeasurement(measurement: string) {
    console.log(measurement)
    try {
        const response = await fetch(serverUrl + "/setting/addNewMeasurement", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                measurement: measurement.toLowerCase()
            })

        });
        if (response.ok) {
            return true

        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}
export async function addNewLocation(location: any) {
    try {
        const response = await fetch(serverUrl + "/setting/addNewStorage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: location.toLowerCase()
            })

        });
        if (response.ok) {
            return true

        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}
export async function addNewVendor({ name, address, phone, account }: any) {
    try {
        const response = await fetch(serverUrl + "/setting/addNewVendor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, address, phone, accountNumber: account
            })

        });
        if (response.ok) {
            return true

        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}
export async function deleteMeasurement(measurement: string) {
    console.log(measurement)
    try {
        const response = await fetch(serverUrl + "/setting/deleteMeasurement", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                measurement: measurement.toLowerCase()
            })

        });
        if (response.ok) {
            return true

        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

export async function deleteVendor(id: string) {
    try {
        const response = await fetch(serverUrl + "/setting/deleteVendor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })

        });
        if (response.ok) {
            return true

        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

export async function deleteLocation(id: string) {

    try {
        const response = await fetch(serverUrl + "/setting/deleteLocation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })

        });
        if (response.ok) {
            return true

        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }

}
