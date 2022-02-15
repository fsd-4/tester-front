import { Fan } from "./fan";
import { SavolDaraja } from "./savol-daraja";
import { Variant } from "./variant";

export interface Savol{
    id: number,
    matn: string,
    variantlar: Variant[],
    fan: Fan,
    savolDraja: SavolDaraja
}