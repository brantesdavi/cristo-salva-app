import { Song } from "./Song.interface";
import { User } from "./User.interface";

export interface Track {
    id?: string,
    song: Song,
    minister?: User,
    tune: string,
    date?: Date,
    createdBy?: User,
}