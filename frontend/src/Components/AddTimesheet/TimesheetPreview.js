import './TimesheetPreview.css';

const TimesheetPreview = ({timesheetCsvDataState}) => {
    return (
        <div className='table'>
            {
                timesheetCsvDataState.map(row => 
                    <div className='tableRow'>
                        {
                            row.map(cell => 
                                <div className='tableCell'>
                                    {cell}
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default TimesheetPreview;