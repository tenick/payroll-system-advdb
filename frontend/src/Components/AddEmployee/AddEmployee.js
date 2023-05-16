import './AddEmployee.css';

const AddEmployee = () => {
  
  return (
    <section id="addEmployee">
        <h1>Add employee:</h1>
        <hr />
        <form>
            <div class='add-emp-inputs'>
                <div class='add-emp-userdetails'>
                    <h1>User Details:</h1>
                    <label for="in_email">First Name:</label>
                    <input required type="text" name="email_address" />

                    <label for="in_email">Last Name:</label>
                    <input required type="text" name="email_address" />
text
                    <label for="in_email">Sex:</label>
                    <input required type="text" name="email_address" />

                    <label for="in_email">Contact Number:</label>
                    <input required type="text" name="email_address" />
                </div>
                
                <div class='add-emp-usercredentials'>
                    <h1>User Credentials:</h1>
                    <label for="in_email">Email Address:</label>
                    <input required type="email" name="email_address" />

                    <label for="in_email">Password:</label>
                    <input required type="password" name="email_address" />
                </div>

                <div class='add-emp-details'>
                    <h1>Employee Details:</h1>
                    <label for="in_email">Gross Salary:</label>
                    <input required type="number" name="email_address" />

                    <label for="in_email">Employee Position:</label>
                    <input required type="text" name="email_address" />

                    <label for="in_email">Probation End Date:</label>
                    <input required type="date" name="email_address" />
                </div>
                
                <div class='add-emp-contribution'>
                    <h1>Contribution Details:</h1>
                    <label for="in_email">SSS:</label>
                    <input required type="text" name="email_address" />

                    <label for="in_email">PAGIBIG:</label>
                    <input required type="text" name="email_address" />

                    <label for="in_email">Philhealth:</label>
                    <input required type="text" name="email_address" />
                </div>

                <div class='add-emp-leave'>
                    <h1>Leaves:</h1>
                    <label for="in_email">Vacation Leave:</label>
                    <input required type="number" name="email_address" />

                    <label for="in_email">Sick Leave:</label>
                    <input required type="number" name="email_address" />

                    <label for="in_email">Emergency Leave:</label>
                    <input required type="number" name="email_address" />
                </div>
            </div>
            

        <hr />
            <button>Submit</button>
        </form>
    </section>
  );
}

export default AddEmployee;
