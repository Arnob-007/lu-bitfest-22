
const lambda = 0.1;
export const compareCoordinates = (pos1, pos2) => {
    if( Math.abs( pos1[0] - pos2[0] ) < lambda && Math.abs( pos1[1] - pos2[1] ) < lambda ) 
        return true;
    else return false;
}