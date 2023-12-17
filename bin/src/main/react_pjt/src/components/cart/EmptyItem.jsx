import '../../css/cart/cart.css'
const EmptyItem = () => {
    return (
        <>

            <form action="#" method="post">
                <table>

                    <tbody style={{ 'display': 'flex' }}>
                        <td className="emptyItem">
                            <p>No Item In Shopping Cart</p>
                            <span>
                                장바구니가 비어있습니다.<br />
                                선택하신 상품을 장바구니에 담아주세요.
                            </span>
                        </td>
                    </tbody>
                </table>



            </form>
        </>
    );
}

export default EmptyItem;