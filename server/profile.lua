local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetProfile', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpu.citizenid,
                zpu.phone_number,
                zpu.created_at,
                zpu.last_seen,
                zpu.avatar,
                zpu.unread_message_service,
                zpu.unread_message,
                zpu.wallpaper,
                zpu.is_anonim,
                zpu.is_donot_disturb,
                zpu.frame,
                zpu.iban,
                zpu.active_loops_userid,
                zpu.inetmax_balance
            from zp_users zpu WHERE zpu.citizenid = ? LIMIT 1
        ]]

        local result = MySQL.single.await(query, {
            citizenid
        })

        result.name = Player.PlayerData.charinfo.firstname .. ' '.. Player.PlayerData.charinfo.lastname

        if result then
            return result
        else
            return nil
        end
    end

    return nil
end)

lib.callback.register('z-phone:server:UpdateProfile', function(source, body)
    local affectedRows = nil
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        if body.type == 'avatar' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET avatar = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'wallpaper' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET wallpaper = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'is_anonim' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET is_anonim = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'is_donot_disturb' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET is_donot_disturb = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'frame' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET frame = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'loops' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET loops_username = ?, loops_name = ? WHERE citizenid = ?', {
                body.username, 
                body.name, 
                citizenid
            })
        else
            print("RETRIGER DETECTED, SHOULD BANN IF NEEDED")
        end

        if affectedRows then
            TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
                type = "Notification",
                from = "Setting",
                message = "Success updated!"
            })
            return true
        else
            return false
        end
    end

    return false
end)