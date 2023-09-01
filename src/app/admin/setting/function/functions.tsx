import serverUrl from '@/config/config';
import React from 'react'

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
