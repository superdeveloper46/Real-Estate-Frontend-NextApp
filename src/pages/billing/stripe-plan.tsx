import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import PlanForm from '@/components/Pages/Billing/Forms/PlanForm';
import BillingLayout from '@/layouts/Billing/Billing.layout';

const StripePlan = () => {
  return (
    <BillingLayout>
      <PlanForm />
    </BillingLayout>
  );
};

export default StripePlan;

export const getServerSideProps = withPageAuthRequired();
