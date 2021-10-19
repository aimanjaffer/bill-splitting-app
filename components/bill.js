export default function Bill(props){
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Unit Price</th>
                    <th>Participants Involved</th>
                </tr>
            </thead>
          <tbody>
            <tr>
                <td>Chicken Biryani</td>
                <td>250</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
            <tr>
                <td>Pizza</td>
                <td>200</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
            <tr>
                <td>Nachos</td>
                <td>150</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
            <tr>
                <td>Peri Peri Fries</td>
                <td>200</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
          </tbody>
        </table>
    </div>);
}