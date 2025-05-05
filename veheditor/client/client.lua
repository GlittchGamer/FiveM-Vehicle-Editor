local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local handlingKeys = {
  'fMass',
  'fInitialDragCoeff',
  'fPercentSubmerged',
  'fDriveBiasFront',
  'nInitialDriveGears',
  'fInitialDriveForce',
  'fDriveInertia',
  'fClutchChangeRateScaleUpShift',
  'fClutchChangeRateScaleDownShift',
  'fInitialDriveMaxFlatVel',
  'fBrakeForce',
  'fBrakeBiasFront',
  'fHandBrakeForce',
  'fSteeringLock',
  'fTractionCurveMax',
  'fTractionCurveMin',
  'fTractionCurveLateral',
  'fTractionSpringDeltaMax',
  'fLowSpeedTractionLossMult',
  'fCamberStiffnesss',
  'fTractionBiasFront',
  'fTractionLossMult',
  'fSuspensionForce',
  'fSuspensionCompDamp',
  'fSuspensionReboundDamp',
  'fSuspensionUpperLimit',
  'fSuspensionLowerLimit',
  'fSuspensionRaise',
  'fSuspensionBiasFront',
  'fAntiRollBarForce',
  'fAntiRollBarBiasFront',
  'fRollCentreHeightFront',
  'fRollCentreHeightRear',
  'fCollisionDamageMult',
  'fWeaponDamageMult',
  'fDeformationDamageMult',
  'fEngineDamageMult',
  'fPetrolTankVolume',
  'fOilVolume',
  'nMonetaryValue'
}

local bikeHandlingKeys = {
  'fLeanFwdCOMMult',
  'fLeanFwdForceMult',
  'fLeanBakCOMMult',
  'fLeanBakForceMult',
  'fMaxBankAngle',
  'fFullAnimAngle',
  'fDesLeanReturnFrac',
  'fStickLeanMult',
  'fBrakingStabilityMult',
  'fInAirSteerMult',
  'fWheelieBalancePoint',
  'fStoppieBalancePoint',
  'fWheelieSteerMult',
  'fRearBalanceMult',
  'fFrontBalanceMult',
  'fBikeGroundSideFrictionMult',
  'fBikeWheelGroundSideFrictionMult',
  'fBikeOnStandLeanAngle',
  'fBikeOnStandSteerAngle',
  'fJumpForce'
}

local handlingLimits = {
  ['fInitialDriveForce'] = 0.42,
  ['fInitialDriveMaxFlatVel'] = 160,
  ['fBrakeForce'] = 1.3,
  ['fTractionCurveMax'] = 2.3,
  ['fTractionCurveMin'] = 2.15,
  ['fSuspensionForce'] = 2.3
}

local vehicleCache = {}
--[[
  vehicleCache[entity] = hamdlingTable
]]


--function to round number down to 5 decimal places
local function Round(num, numDecimalPlaces)
  local mult = 10 ^ (numDecimalPlaces or 0)
  return math.floor(num * mult + 0.5) / mult
end

local function getVehicleTable(vehicle, pModel)
  local isBike = IsThisModelABike(pModel)
  if vehicleCache[pModel] then
    for index, value in pairs(vehicleCache[pModel]) do
      if isBike and table.find(bikeHandlingKeys, value.name) then
        local newValue = GetVehicleHandlingFloat(vehicle, 'CBikeHandlingData', value.name)
        value.curr = Round(newValue, 4)
      else
        if value.name == 'nInitialDriveGears' then
          SetVehicleHandlingInt(vehicle, 'CHandlingData', value.name, math.ceil(value.curr))
        else
          local newValue = value.curr + 0.0
          SetVehicleHandlingFloat(vehicle, 'CHandlingData', value.name, newValue)
        end
      end
    end
    return vehicleCache[pModel]
  else
    local handlingTable = {}
    for _, key in ipairs(handlingKeys) do
      local value = GetVehicleHandlingFloat(vehicle, 'CHandlingData', key)
      table.insert(handlingTable,
        { name = key, history = {}, base = Round(value, 4), curr = Round(value, 4), ceiling = handlingLimits[key] or nil })
    end

    if isBike then
      for _, key in ipairs(bikeHandlingKeys) do
        local value = GetVehicleHandlingFloat(vehicle, 'CBikeHandlingData', key)
        table.insert(handlingTable,
          { name = key, history = {}, base = Round(value, 4), curr = Round(value, 4), ceiling = handlingLimits[key] or nil })
      end
    end

    vehicleCache[pModel] = handlingTable
    return vehicleCache[pModel]
  end
end

RegisterCommand('veheditor', function()
  local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
  if not DoesEntityExist(vehicle) then
    debugPrint('Player is not in a vehicle')
    return
  end

  local vehModel = GetEntityModel(vehicle)

  local handlingTable = getVehicleTable(vehicle, vehModel)
  SendReactMessage('setVehicleData', handlingTable)

  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end, false)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb('ok')
end)


RegisterNUICallback('vehicle-editor/setHandlingField', function(data, cb)
  local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
  if not DoesEntityExist(vehicle) then
    debugPrint('Player is not in a vehicle')
    return
  end

  local field = data.field
  local value = data.value

  local isBike = IsThisModelABike(GetEntityModel(vehicle))

  if isBike and table.find(bikeHandlingKeys, field) then
    SetVehicleHandlingFloat(vehicle, 'CBikeHandlingData', field, value)
  else
    if field == 'nInitialDriveGears' then
      SetVehicleHandlingInt(vehicle, 'CHandlingData', field, math.ceil(value))
    else
      local newValue = value + 0.0
      SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, newValue)
    end
  end

  ModifyVehicleTopSpeed(vehicle, 1.0)

  local vehModel = GetEntityModel(vehicle)

  for k, v in pairs(vehicleCache[vehModel]) do
    if v.name == field then
      v.curr = value
      break
    end
  end

  debugPrint('Set handling field', field, 'to', value)

  TriggerServerEvent('vehicle-editor/setVehicleHistory', GetDisplayNameFromVehicleModel(GetEntityModel((vehicle))),
    data.history)

  cb('ok')
end)

table.find = function(t, el)
  for _, value in ipairs(t) do
    if value == el then
      return true
    end
  end
  return false
end
