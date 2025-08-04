// Make pay buttons fill the form
        document.querySelectorAll('.btn-primary').forEach(button => {
            if(button.textContent === "Pay") {
                button.addEventListener('click', function() {
                    const feeItem = this.closest('.fee-item');
                    const feeName = feeItem.querySelector('.fee-name').textContent;
                    const feeAmount = feeItem.querySelector('.fee-amount').textContent.replace('₦', '').replace(',', '');
                    
                    // Set values in form
                    document.getElementById('feeType').value = feeName.includes('Tuition') ? 'tuition' : 'accommodation';
                    document.getElementById('amount').value = feeAmount;
                    
                    // Scroll to form
                    document.querySelector('.payment-form').scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight the selected fee
                    document.querySelectorAll('.fee-item').forEach(item => {
                        item.style.backgroundColor = '';
                    });
                    feeItem.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                });
            }
        });
        
        // Payment form submission
        document.querySelector('.payment-form .btn').addEventListener('click', function() {
            const feeType = document.getElementById('feeType').value;
            const amount = document.getElementById('amount').value;
            const cardNumber = document.getElementById('cardNumber').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            const cardName = document.getElementById('cardName').value;
            
            if(!feeType) {
                alert('Please select a fee to pay');
                return;
            }
            
            if(!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            if(cardNumber.replace(/\s/g, '').length !== 16) {
                alert('Please enter a valid 16-digit card number');
                return;
            }
            
            if(!expiry || !expiry.match(/\d{2}\/\d{2}/)) {
                alert('Please enter a valid expiry date (MM/YY)');
                return;
            }
            
            if(!cvv || cvv.length !== 3) {
                alert('Please enter a valid CVV (3 digits)');
                return;
            }
            
            if(!cardName) {
                alert('Please enter the name on your card');
                return;
            }
            
            // Simulate payment processing
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-lock"></i> Pay Now';
                this.disabled = false;
                
                // Show success message
                alert(`Payment of ₦${amount} was successful! Thank you.`);
                
                // Reset form
                document.getElementById('feeType').value = '';
                document.getElementById('amount').value = '';
                document.getElementById('cardNumber').value = '';
                document.getElementById('expiry').value = '';
                document.getElementById('cvv').value = '';
                document.getElementById('cardName').value = '';
                
                // For demo purposes, we'll update the status of the first pending fee
                const firstPending = document.querySelector('.status-pending');
                if(firstPending) {
                    firstPending.textContent = 'Paid';
                    firstPending.className = 'fee-status status-paid';
                    firstPending.closest('.fee-item').querySelector('button').className = 'btn btn-success';
                    firstPending.closest('.fee-item').querySelector('button').textContent = 'Paid';
                    firstPending.closest('.fee-item').querySelector('button').disabled = true;
                }
            }, 2000);
        });