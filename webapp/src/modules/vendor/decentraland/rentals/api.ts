import signedFetch, { AuthIdentity } from 'decentraland-crypto-fetch'
import { RentalListing, RentalListingCreation, RentalsListingsFilterBy } from '@dcl/schemas'
import { BaseAPI } from 'decentraland-dapps/dist/lib/api'
import { config } from '../../../../config'
import { objectToURLSearchParams } from './utils'

export const SIGNATURES_SERVER_URL = config.get('SIGNATURES_SERVER_URL')
type ValueOf<T> = T[keyof T]

class RentalsAPI extends BaseAPI {
  createRentalListing = async (listing: RentalListingCreation, identity: AuthIdentity): Promise<RentalListing> => {
    const url = SIGNATURES_SERVER_URL + `/rentals-listings`
    const response = await signedFetch(url, {
      method: 'POST',
      identity,
      body: JSON.stringify(listing),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    try {
      const json = await response.json()
      if (json.ok) {
        return json.data
      } else {
        throw new Error(json.message)
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  refreshRentalListing = async (rentalListingId: string) => {
    const url = SIGNATURES_SERVER_URL + `/rentals-listings/${rentalListingId}`
    const response = await signedFetch(url, {
      method: 'PATCH'
    })

    if (!response.ok) {
      throw new Error('The signature server responded without a 2XX status code.')
    }

    try {
      const json = await response.json()
      if (json.ok) {
        return json.data
      } else {
        throw new Error(json.message)
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  getRentalListings = async (
    params: RentalsListingsFilterBy & { page: number; limit: number }
  ): Promise<{
    results: RentalListing[]
    total: number
  }> => {
    const UrlSearchParams = URLSearchParams ?? window.URLSearchParams
    const urlSearchParams = new UrlSearchParams()
    ;(Object.keys(params) as Array<keyof typeof params>).forEach(parameterName => {
      if (Array.isArray(params[parameterName])) {
        ;(params[parameterName] as ValueOf<typeof params>[]).forEach(parameterValue => {
          urlSearchParams.append(parameterName, (parameterValue ?? '').toString())
        })
      } else {
        urlSearchParams.append(parameterName, (params[parameterName] ?? '').toString())
      }
    })
    const url = SIGNATURES_SERVER_URL + `/rentals-listings?` + urlSearchParams.toString()
    const response = await signedFetch(url)

    if (!response.ok) {
      throw new Error('The signature server responded without a 2XX status code.')
    }

    try {
      const json = await response.json()
      if (json.ok) {
        return json.data
      } else {
        throw new Error(json.message)
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  getRentalListingsPrices = async (filters: RentalsListingsFilterBy): Promise<Record<string, number>> => {
    const queryParams = objectToURLSearchParams(filters)
    try {
      const response = await this.request('get', `/rental-listings/prices?${queryParams.toString()}`)
      return response
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}

export const rentalsAPI = new RentalsAPI(SIGNATURES_SERVER_URL)
