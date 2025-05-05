/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { sendNui } from '@/utils/sendNui';
import { faClockRotateLeft, faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Popover } from 'react-tiny-popover';

interface IHandlingArray {
  name: string;
  history: number[];
  base: number;
  curr: number;
  ceiling?: number;
}

const DemoHandlingArray: IHandlingArray[] = [
  {
    name: 'fMass',
    history: [0.6, 0.2],
    base: 1295.0,
    curr: 1295.0,
    ceiling: 1295.0,
  },
  {
    name: 'fInitialDragCoeff',
    history: [],
    base: 26.0,
    curr: 26.0,
    ceiling: 100.0,
  },
  {
    name: 'fPercentSubmerged',
    history: [],
    base: 85.0,
    curr: 85.0,
    ceiling: 100.0,
  },
  {
    name: 'fDriveBiasFront',
    history: [],
    base: 0.25,
    curr: 0.25,
    ceiling: 1.0,
  },
  {
    name: 'nInitialDriveGears',
    history: [],
    base: 5,
    curr: 5,
    ceiling: 10,
  },
  {
    name: 'fInitialDriveForce',
    history: [],
    base: 0.858,
    curr: 0.858,
  },
  {
    name: 'fDriveInertia',
    history: [],
    base: 1.0,
    curr: 1.0,
    ceiling: 1.0,
  },
  {
    name: 'fClutchChangeRateScaleUpShift',
    history: [],
    base: 4.8,
    curr: 4.8,
    ceiling: 5.0,
  },
  {
    name: 'fClutchChangeRateScaleDownShift',
    history: [],
    base: 4.7,
    curr: 4.7,
    ceiling: 5.0,
  },
  {
    name: 'fInitialDriveMaxFlatVel',
    history: [],
    base: 128.8,
    curr: 128.8,
    ceiling: 150.0,
  },
  {
    name: 'fBrakeForce',
    history: [],
    base: 1.1,
    curr: 1.1,
    ceiling: 2.0,
  },
  {
    name: 'fBrakeBiasFront',
    history: [],
    base: 0.25,
    curr: 0.25,
    ceiling: 1.0,
  },
  {
    name: 'fHandBrakeForce',
    history: [],
    base: 0.79,
    curr: 0.79,
    ceiling: 1.0,
  },
  {
    name: 'fSteeringLock',
    history: [],
    base: 78.15,
    curr: 78.15,
    ceiling: 90.0,
  },
  {
    name: 'fTractionCurveMax',
    history: [],
    base: 1.56,
    curr: 1.56,
    ceiling: 2.0,
  },
  {
    name: 'fTractionCurveMin',
    history: [],
    base: 1.4,
    curr: 1.4,
    ceiling: 2.0,
  },
  {
    name: 'fTractionCurveLateral',
    history: [],
    base: 32.0,
    curr: 32.0,
    ceiling: 40.0,
  },
  {
    name: 'fTractionSpringDeltaMax',
    history: [],
    base: 0.15,
    curr: 0.15,
    ceiling: 0.2,
  },
  {
    name: 'fLowSpeedTractionLossMult',
    history: [],
    base: 0.6,
    curr: 0.6,
    ceiling: 1.0,
  },
  {
    name: 'fCamberStiffnesss',
    history: [],
    base: 0.0,
    curr: 0.0,
    ceiling: 1.0,
  },
  {
    name: 'fTractionBiasFront',
    history: [],
    base: 0.48075,
    curr: 0.48075,
    ceiling: 1.0,
  },
  {
    name: 'fTractionLossMult',
    history: [],
    base: 1.0,
    curr: 1.0,
    ceiling: 1.0,
  },
  {
    name: 'fSuspensionForce',
    history: [],
    base: 2.05,
    curr: 2.05,
    ceiling: 3.0,
  },
  {
    name: 'fSuspensionCompDamp',
    history: [],
    base: 1.1,
    curr: 1.1,
    ceiling: 2.0,
  },
  {
    name: 'fSuspensionReboundDamp',
    history: [],
    base: 1.7,
    curr: 1.7,
    ceiling: 2.0,
  },
  {
    name: 'fSuspensionUpperLimit',
    history: [],
    base: 0.07,
    curr: 0.07,
    ceiling: 0.1,
  },
  {
    name: 'fSuspensionLowerLimit',
    history: [],
    base: -0.09,
    curr: -0.09,
    ceiling: 0.0,
  },
  {
    name: 'fSuspensionRaise',
    history: [],
    base: 0.015,
    curr: 0.015,
    ceiling: 0.05,
  },
  {
    name: 'fSuspensionBiasFront',
    history: [],
    base: 0.51,
    curr: 0.51,
    ceiling: 1.0,
  },
  {
    name: 'fAntiRollBarForce',
    history: [],
    base: 0.215,
    curr: 0.215,
    ceiling: 1.0,
  },
  {
    name: 'fAntiRollBarBiasFront',
    history: [],
    base: 0.85,
    curr: 0.85,
    ceiling: 1.0,
  },
  {
    name: 'fRollCentreHeightFront',
    history: [],
    base: 0.235,
    curr: 0.235,
    ceiling: 1.0,
  },
  {
    name: 'fRollCentreHeightRear',
    history: [],
    base: 0.195,
    curr: 0.195,
    ceiling: 1.0,
  },
  {
    name: 'fCollisionDamageMult',
    history: [],
    base: 1.0,
    curr: 1.0,
    ceiling: 1.0,
  },
  {
    name: 'fWeaponDamageMult',
    history: [],
    base: 1.0,
    curr: 1.0,
    ceiling: 1.0,
  },
  {
    name: 'fDeformationDamageMult',
    history: [],
    base: 0.6,
    curr: 0.6,
    ceiling: 1.0,
  },
  {
    name: 'fEngineDamageMult',
    history: [],
    base: 1.0,
    curr: 1.0,
    ceiling: 1.0,
  },
  {
    name: 'fPetrolTankVolume',
    history: [],
    base: 65.0,
    curr: 65.0,
    ceiling: 100.0,
  },
  {
    name: 'fOilVolume',
    history: [],
    base: 5.0,
    curr: 5.0,
    ceiling: 10.0,
  },
  {
    name: 'nMonetaryValue',
    history: [],
    base: 150000,
    curr: 150000,
    ceiling: 200000,
  },
];

interface IVehicleClasses {
  value: number;
  class: string;
}

const VehicleClasses: IVehicleClasses[] = [
  {
    value: 2000000,
    class: 'X',
  },
  {
    value: 1000000,
    class: 'S',
  },
  {
    value: 500000,
    class: 'A',
  },
  {
    value: 350000,
    class: 'B',
  },
  {
    value: 250000,
    class: 'C',
  },
  {
    value: 150000,
    class: 'D',
  },
];

const HandlingEditor = () => {
  const [HandlingArray, setHandlingArray] = React.useState<IHandlingArray[]>(DemoHandlingArray);

  const [Search, setSearch] = React.useState<string>('');

  const filteredHandlingArray = HandlingArray.filter((handling) => handling.name.toLowerCase().includes(Search.toLowerCase()));

  const changeHandlingValue = React.useCallback(
    (key: string, newValue: number) => {
      const newHandlingArray = [...HandlingArray];
      const index = newHandlingArray.findIndex((handling) => handling.name === key);
      if (index === -1) return;
      if (newHandlingArray[index].ceiling && newValue > newHandlingArray[index].ceiling) newValue = newHandlingArray[index].ceiling;
      newHandlingArray[index].curr = newValue;
      setHandlingArray(newHandlingArray);
    },
    [HandlingArray],
  );

  const sendHandlingData = React.useCallback(
    (key: string) => {
      const handling = HandlingArray.find((handling) => handling.name === key);
      handling?.history.push(handling.curr);
      setHandlingArray([...HandlingArray]);

      const HandlingHistory = HandlingArray.map((handling) => ({ name: handling.name, history: handling.history }));
      sendNui('vehicle-editor/setHandlingField', {
        field: key,
        value: handling?.curr,
        history: HandlingHistory,
      });
    },
    [HandlingArray],
  );

  useNuiEvent('setVehicleData', (data: IHandlingArray[]) => {
    setHandlingArray(data);
  });

  const findVehicleClass = React.useCallback(
    (value: number) => {
      return VehicleClasses.find((vehicleClass) => vehicleClass.value === value)?.class || 'N/A';
    },
    [VehicleClasses],
  );

  return React.useMemo(
    () => (
      <div className="flex flex-col space-y-2 overflow-scroll no-scrollbar">
        <>
          <Input className="w-full" placeholder="Search" value={Search} onChange={(e) => setSearch(e.target.value)} inputAdornment={faMagnifyingGlass} />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>History</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>Curr</TableHead>
                <TableHead>Ceiling</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHandlingArray.map((handling, index) => (
                <TableRow key={index}>
                  <TableCell>{handling.name}</TableCell>
                  <Popover
                    // isOpen={index === 0}
                    isOpen={false}
                    content={
                      <div className="bg-slate-900/70 text-white p-2">
                        <>
                          {handling.history.map((value, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{value}</span>
                            </div>
                          ))}
                        </>
                      </div>
                    }
                  >
                    <TableCell className="text-center">
                      <FontAwesomeIcon icon={faClockRotateLeft} className="text-primary cursor-pointer" />
                    </TableCell>
                  </Popover>
                  <TableCell>
                    <Input className="w-[65px] text-white" value={handling.base} disabled />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="w-[65px] text-white"
                      value={handling.curr}
                      type="number"
                      onChange={(e) => changeHandlingValue(handling.name, Number(e.target.value))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          sendHandlingData(handling.name);
                          // e.currentTarget.blur();
                        }
                      }}
                      onBlur={() => sendHandlingData(handling.name)}
                    />
                  </TableCell>
                  <TableCell>
                    {handling.name === 'nMonetaryValue' ? (
                      <Input className="w-[65px] text-white" value={findVehicleClass(handling.curr)} disabled />
                    ) : (
                      <Input className="w-[65px] text-white" value={handling?.ceiling || ''} disabled />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </div>
    ),
    [Search, changeHandlingValue, filteredHandlingArray, sendHandlingData, findVehicleClass],
  );
};

export default HandlingEditor;
