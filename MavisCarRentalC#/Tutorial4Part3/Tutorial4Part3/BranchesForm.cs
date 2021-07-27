using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Tutorial4Part3
{
    public partial class BranchesForm : Form
    {
        SqlConnection con = new SqlConnection(
            "Data Source = (LocalDB)\\MSSQLLocalDB; AttachDbFilename=E:\\C#\\Assessments\\Tutorial4\\Part3\\Tutorial4Part3\\Tutorial4Part3\\Mavis.mdf;Integrated Security = True");
        SqlCommand cmd;
        SqlDataAdapter adapt;
        string branch_code = "";

        public BranchesForm()
        {
            InitializeComponent();
        }

        private void BranchesForm_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'mavisDataSet1.M_Branch' table. You can move, or remove it, as needed.
            this.m_BranchTableAdapter.Fill(this.mavisDataSet1.M_Branch);

        }

        // closes the branches form if the Home button is clicked
        // I forgot to change the name of the button before I'd created this method - it should be btnHome
        private void button1_Click(object sender, EventArgs e)
        {
            this.Dispose();
        }

        // adds a new branch to the database
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (txtBranchCode.Text != "" && txtBranch.Text != "" && txtManager.Text != "" && txtAddress.Text != "" && txtSuburb.Text != ""
                && txtState.Text != "" && txtPostcode.Text != "" && txtPhone.Text != "" && txtFax.Text != "")
            {
                try
                {
                    cmd = new SqlCommand("INSERT INTO M_Branch(Branch_Code,Branch_name,Manager,Branch_Address,Suburb,State," +
                        "Post_code,Phone,Fax) values(@branch_code, @branch_name, @manager, @branch_address, @suburb, " +
                        "@state, @post_code, @phone, @fax)", con);
                    con.Open();
                    cmd.Parameters.AddWithValue("@branch_code", txtBranchCode.Text);
                    cmd.Parameters.AddWithValue("@branch_name", txtBranch.Text);
                    cmd.Parameters.AddWithValue("@manager", txtManager.Text);
                    cmd.Parameters.AddWithValue("@branch_address", txtAddress.Text);
                    cmd.Parameters.AddWithValue("@suburb", txtSuburb.Text);
                    cmd.Parameters.AddWithValue("@state", txtState.Text);
                    cmd.Parameters.AddWithValue("@post_code", txtPostcode.Text);
                    cmd.Parameters.AddWithValue("@phone", txtPhone.Text);
                    cmd.Parameters.AddWithValue("@fax", txtFax.Text);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Record Inserted Successfully");
                    DisplayData();
                    ClearTextBoxes();
                }
                catch (SqlException sqlEx)
                {
                    MessageBox.Show("Branch code already exists");
                }
                con.Close();
            }
            else
            {
                MessageBox.Show("Error - please provide data for all fields");
            }
        }

        private void txtAddress_TextChanged(object sender, EventArgs e)
        {
            // this was added accidentally and the lab documents warned me not to delete it
        }

        private void txtBranchCode_TextChanged(object sender, EventArgs e)
        {
            // this was added accidentally and the lab documents warned me not to delete it
        }

        // updates a selected record based on its branch code
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (txtBranchCode.Text != "" && txtBranch.Text != "" && txtManager.Text != "" && txtAddress.Text != "" && txtSuburb.Text != ""
                && txtState.Text != "" && txtPostcode.Text != "" && txtPhone.Text != "" && txtFax.Text != "")
            {
                try
                {
                    cmd = new SqlCommand(
                    "UPDATE M_Branch set Branch_name=@branch_name, Manager=@manager, " +
                    "Branch_Address=@branch_address, Suburb=@suburb, State=@state, Post_code=@post_code, Phone=@phone, Fax=@fax " +
                    "WHERE Branch_Code=@branch_code", con);
                    con.Open();
                    cmd.Parameters.AddWithValue("@branch_code", txtBranchCode.Text);
                    cmd.Parameters.AddWithValue("@branch_name", txtBranch.Text);
                    cmd.Parameters.AddWithValue("@manager", txtManager.Text);
                    cmd.Parameters.AddWithValue("@branch_address", txtAddress.Text);
                    cmd.Parameters.AddWithValue("@suburb", txtSuburb.Text);
                    cmd.Parameters.AddWithValue("@state", txtState.Text);
                    cmd.Parameters.AddWithValue("@post_code", txtPostcode.Text);
                    cmd.Parameters.AddWithValue("@phone", txtPhone.Text);
                    cmd.Parameters.AddWithValue("@fax", txtFax.Text);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Record Updated Successfully");
                    DisplayData();
                    ClearTextBoxes();
                }
                catch (SqlException sqlEx)
                {
                    MessageBox.Show("Branch Code already exists");
                }
                con.Close();
            }
            else
            {
                MessageBox.Show("Error - please provide data for all fields");
            }
        }

        // loads the selected record's data into the text boxes
        private void dataGridView1_RowHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            branch_code = dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
            txtBranchCode.Text = branch_code;
            txtBranch.Text = dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
            txtManager.Text = dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
            txtAddress.Text = dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
            txtSuburb.Text = dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
            txtState.Text = dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
            txtPostcode.Text = dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
            txtPhone.Text = dataGridView1.Rows[e.RowIndex].Cells[7].Value.ToString();
            txtFax.Text = dataGridView1.Rows[e.RowIndex].Cells[8].Value.ToString();
        }

        // refreshes the dataGridView table
        private void DisplayData()
        {
            // starting this block with con.Close() fixes an issue where the connection was already open,
            // and I couldn't find where I had left the connection open
            con.Close();
            con.Open();
            DataTable dt = new DataTable();
            adapt = new SqlDataAdapter("select * from M_Branch", con);
            adapt.Fill(dt);
            dataGridView1.DataSource = dt;
            con.Close();
        }

        // deletes a selected record
        private void btnDelete_Click(object sender, EventArgs e)
        {
            // checks to make sure a branch code has been selected
            if (branch_code != "")
            {
                // deletes an entire record based on the branch code
                cmd = new SqlCommand("DELETE FROM M_Branch where Branch_Code=@branch_code", con);
                con.Open();
                cmd.Parameters.AddWithValue("@branch_code", txtBranchCode.Text);
                cmd.ExecuteNonQuery();
                con.Close();
                MessageBox.Show("Record Deleted Successfully!");
                DisplayData();
                ClearTextBoxes();
            }
            else
            {
                MessageBox.Show("Please select a record to delete");
            }
        }

        // clears all text boxes
        private void ClearTextBoxes()
        {
            txtBranchCode.Text = "";
            txtBranch.Text = "";
            txtManager.Text = "";
            txtAddress.Text = "";
            txtSuburb.Text = "";
            txtState.Text = "";
            txtPostcode.Text = "";
            txtPhone.Text = "";
            txtFax.Text = "";
        }
    }
    
}
