export default interface Track {
    id: number;
    name: string;
    albumId: number;
    mediaTypeId: number;
    genreId: number;
    composer: string;
    milliseconds: number;
    bytes: number;
    unitPrice: number;
}
