import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  ViewSwitcher,
  DayView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


const appointments = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2021, 9, 25, 12, 35),
  //endDate: new Date(2021, 9, 18, 15, 0),
  id: 0,
  members: [1],
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2021, 9, 19, 12, 35),
  endDate: new Date(2021, 9, 24, 15, 0),
  id: 1,
  members: [2, 4],
  location: 'Room 2',
}, {
  title: 'Install New Router in Dev Room',
  startDate: new Date(2021, 9, 27, 12, 35),
  endDate: new Date(2021, 9, 27, 15, 0),
  id: 2,
  members: [3,5,1,2,4],
  location: 'Room 3',
}, {
  title: 'Approve Personal Computer Upgrade Plan',
  startDate: new Date(2021, 9, 28, 12, 35),
  endDate: new Date(2021, 9, 28, 15, 0),
  id: 3,
  members: [4, 1],
  location: 'Room 4',
}, {
  title: 'Final Budget Review',
  startDate: new Date(2018, 5, 29, 12, 35),
  endDate: new Date(2018, 5, 29, 15, 0),
  id: 4,
  members: [5, 1, 3],
  location: 'Room 5',
}];

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});




const instances= [
  { id: 1, text: 'Andrew Glover' },
  { id: 2, text: 'Arnie Schwartz' },
  { id: 3, text: 'John Heart' },
  { id: 4, text: 'Taylor Riley' },
  { id: 5, text: 'Brad Farkus' },

]
const CalendarioTareas = ({...props}) => {
  
    const mainResourceName="members"
    const locale= 'es-ES'
    const resources = [
        {
            //se debe respetar este formato para que se visualicen los miembros
            fieldName: 'members',
            title: 'Members',
            allowMultiple: true,
            instances:instances
            // instances: [
            //   { id: 1, text: 'Andrew Glover' },
            //   { id: 2, text: 'Arnie Schwartz' },
            //   { id: 3, text: 'John Heart' },
            //   { id: 4, text: 'Taylor Riley' },
            //   { id: 5, text: 'Brad Farkus' },
            // ],
          },
    ]
    let diaHoy = new Date()

    const allDayLocalizationMessages = {
        'es-ES': {
          allDay: 'Varios dias',
          today:"Hoy",
          week:"semana",
          day:"dia",
          month:"mes"
        },
      };
      
      const getAllDayMessages = locale => allDayLocalizationMessages[locale];
    
  


    return (
      <React.Fragment>

        <Paper>
          <Scheduler
          //ESCRIBIR data={props.ordenesTareasCalendario} para mostrar los datos de la base, lo mismo con resoruces para que funcione
            data={props.ordenesTareasCalendario}
            locale={locale}
          >
            <ViewState
              defaultCurrentDate={diaHoy}
            />
            <WeekView
              //startDayHour={8.5}
              //endDayHour={19.5}
            />
            
            <DayView
            //startDayHour={8.5}
            //endDayHour={19.5}
            />
            <MonthView />
            <AllDayPanel 
            messages={getAllDayMessages(locale)}/>
            <Toolbar />
            <DateNavigator />
            <TodayButton 
            messages={getAllDayMessages(locale)}/>
            <ViewSwitcher
            displayName={getAllDayMessages(locale)}/>
            <Appointments />
            <AppointmentTooltip />
            <Resources
              //ESCRIBIR data={props.resources} PARA MOSTRAR LOS DATOS DE LA BASE
              data={props.resources}
              mainResourceName={mainResourceName}
            />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  
}

export default CalendarioTareas;
