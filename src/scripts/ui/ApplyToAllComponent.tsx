import { getGameOptions } from "../Global";
import { applyToAllBuildings } from "../logic/BuildingLogic";
import { Config } from "../logic/Config";
import type { GameState } from "../logic/GameState";
import type { IBuildingData } from "../logic/Tile";
import { L, t } from "../utilities/i18n";
import { playClick } from "../visuals/Sound";

export function ApplyToAllComponent({
   building,
   getOptions,
   gameState,
}: {
   building: IBuildingData;
   getOptions: (s: IBuildingData) => Partial<IBuildingData>;
   gameState: GameState;
}): React.ReactNode {
   const def = Config.Building[building.type];
   return (
      <div className="text-small row">
         <div
            aria-label={t(L.ApplyToAllBuilding, { building: def.name() })}
            data-balloon-pos="right"
            data-balloon-text="left"
            data-balloon-length="medium"
            className="text-link"
            onClick={() => {
               playClick();
               applyToAllBuildings(building.type, getOptions, gameState);
            }}
         >
            {t(L.ApplyToAll, { building: def.name() })}
         </div>
         <div className="f1"></div>
         <div
            aria-label={t(L.SetAsDefaultBuilding, {
               building: def.name(),
            })}
            data-balloon-pos="left"
            data-balloon-text="left"
            data-balloon-length="medium"
            className="text-link"
            onClick={() => {
               playClick();
               const defaults = getGameOptions().buildingDefaults;
               if (!defaults[building.type]) {
                  defaults[building.type] = {};
               }
               Object.assign(defaults[building.type]!, getOptions(building));
            }}
         >
            {t(L.SetAsDefault, { building: def.name() })}
         </div>
      </div>
   );
}