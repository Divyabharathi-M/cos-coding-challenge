export interface BuyerAuctionsResponse {
    items: BuyerAuction[],
    page: number,
    total: number
}

export interface BuyerAuction {
    id: number,
    label: string,
    associatedVehicle: AssociatedVehicle,
    currentHighestBidValue: number,
    remainingTimeInSeconds: number,
    amIHighestBidder: boolean,
}

export interface AssociatedVehicle {
    ez: string,
    transmission: number,
    fuelType: number,
    mileageInKm: number,
    vehicleImages: VehicleImage[]
}

interface VehicleImage {
    url: string,
    perspective: string,

}
export interface BuyerAuctionDisplayModel {
    id: number,
    label: string,
    ez: string,
    transmission: number,
    fuelType: number,
    mileageInKm: string,
    currentHighestBidValue: string,
    remainingTimeInSeconds: number,
    amIHighestBidder: boolean,
    vehicleImages: VehicleImage[]
}