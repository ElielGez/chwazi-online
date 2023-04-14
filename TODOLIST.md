TODOLIST(ordered by priority):

- feedback game over (sound? vibrate?)
- add winners modal
- add qr code in modal
- fix bug in online fingers move (a lot of events from websockets)
- server side optimize in-memory rooms (redis?)
- when server is donw , add icon for Network Button
- adjust random color according to dark mode or light mode (bright or dark colors)


DONE:
- fix bug onWinners online
- fix small movements
- add deviceDimensions to circle and calculate the position for cross devices by this formula: 
    CIRCLE_ORIG_WIDTH = 1000
    POSITION_X = 900
    DEVICE_WIDTH = 700 (board width)

    if(POSITION_X > DEVICE_WIDTH)
        NEW_POSITION_X = POSITION_X - (POSITION_X - DEVICE_WIDTH) - (CIRCLE_ORIG_WIDTH - POSITION_X)
    
    if(POSITION_Y > DEVICE_HEIGHT)
        NEW_POSITION_Y = POSITION_Y - (POSITION_Y - DEVICE_HEIGHT) - (CIRCLE_ORIG_HEIGHT - POSITION_Y)
                            
