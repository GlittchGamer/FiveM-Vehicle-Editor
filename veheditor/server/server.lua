RegisterNetEvent('vehicle-editor/setVehicleHistory', function(pVehicleModel, pHistory)
  --check if vehicle.json exists
  -- if vehicle == nil then return end

  local folderPath = string.format('vehicle_history/%s.json', pVehicleModel)
  -- local vehicleData = json.decode(LoadResourceFile(GetCurrentResourceName(), folderPath))

  --using io.open to check if file exists
  local file = io.open(folderPath, 'r')
  if file == nil then
    --if file does not exist, create it
    file = io.open(folderPath, 'a')
    io.output(file)
    io.write('[]')
    io.close(file)
  end

  --save the history
  file = io.open(folderPath, 'w')
  io.output(file)
  io.write(json.encode(pHistory, { indent = true, indent_amt = 2 }))
  io.close(file)
end)
